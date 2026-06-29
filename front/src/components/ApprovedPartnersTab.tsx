import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import api from "@/api/api";
import { Link } from "react-router-dom";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import { Trash2, UserMinus, Eye, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";



type LastMonthPayment = {
    status: string;
    totalAmount?: number;
    paidAt?: string | null;
    monthlyEarningId?: string | null;
};

type ApprovedPartner = {
    id: string;
    name: string;
    email: string;
    number: string;
    status: string;
    monthlyEarnings: number;
    totalEarnings: number;
    registeredAt: string;
    message?: string;
    coupons: Array<{
        id: string;
        code: string;
        description?: string;
    }>;
    earnings: {
        total: number;
        monthly: Record<string, number>;
    };
    lastMonthPayment?: LastMonthPayment;
};

export default function ApprovedPartnersTab() {
    const { t } = useLanguage();
    const [partners, setPartners] = useState<ApprovedPartner[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Details dialog state
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState<ApprovedPartner | null>(null);


    // Remove coupon state
    const [removingCouponId, setRemovingCouponId] = useState<string | null>(null);
    const [removeCouponError, setRemoveCouponError] = useState("");

    // Remove partner state
    const [removingPartnerId, setRemovingPartnerId] = useState<string | null>(null);

    // Pay Last Month Dialog State
    const [payDialogOpen, setPayDialogOpen] = useState(false);
    const [payPartner, setPayPartner] = useState<ApprovedPartner | null>(null);
    const [payNotes, setPayNotes] = useState("Paid via UPI");
    const [payLoading, setPayLoading] = useState(false);

    // Date calculations for last month
    const now = new Date();
    const lastYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    const lastMonth = now.getMonth() === 0 ? 12 : now.getMonth();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const openPayDialog = (partner: ApprovedPartner) => {
        setPayPartner(partner);
        setPayNotes("Paid via UPI");
        setPayDialogOpen(true);
    };

    const handlePayLastMonth = async () => {
        if (!payPartner) return;
        setPayLoading(true);
        try {
            const earningId = payPartner.lastMonthPayment?.monthlyEarningId || `temp-${lastYear}-${lastMonth}`;
            const res = await api.patch(`/admin/partners/earnings/${earningId}/mark-paid`, {
                notes: payNotes,
                year: lastYear,
                month: lastMonth,
                partnerId: payPartner.id
            });

            if (res.data.success || res.status === 200) {
                toast.success("Payment marked as paid successfully");
                setPartners(prev => prev.map(p => {
                    if (p.id === payPartner.id) {
                        return {
                            ...p,
                            lastMonthPayment: {
                                status: "PAID",
                                totalAmount: p.lastMonthPayment?.totalAmount || 0,
                                paidAt: new Date().toISOString(),
                                monthlyEarningId: p.lastMonthPayment?.monthlyEarningId || res.data.data?.id || `temp-${lastYear}-${lastMonth}`
                            }
                        };
                    }
                    return p;
                }));
                setPayDialogOpen(false);
                setPayPartner(null);
            } else {
                toast.error(res.data.message || "Failed to update payment status");
            }
        } catch (error: any) {
            console.error("Error marking last month payment as paid:", error);
            toast.error(error.response?.data?.message || "Failed to update payment status");
        } finally {
            setPayLoading(false);
        }
    }; useEffect(() => {
        async function fetchApprovedPartners() {
            try {
                const res = await api.get("/admin/partners/approved");
                setPartners(res.data.data || []);
            } catch {
                setError(t("reviews.messages.fetch_error"));
            }
            setLoading(false);
        }
        fetchApprovedPartners();
    }, []);



    const handleRemoveCoupon = async (partnerId: string, couponId: string) => {
        if (!window.confirm(t("partners_tab.approved.confirm_remove_coupon"))) return;
        setRemovingCouponId(couponId);
        setRemoveCouponError("");
        try {
            await api.delete(`/admin/partners/${partnerId}/coupons/${couponId}`);
            // Update the selected partner's coupons
            setSelectedPartner(prev => prev ? {
                ...prev,
                coupons: prev.coupons.filter(c => c.id !== couponId)
            } : prev);
            // Also update in the main partners list
            setPartners(prev => prev.map(p => p.id === partnerId ? {
                ...p,
                coupons: p.coupons.filter(c => c.id !== couponId)
            } : p));
        } catch {
            setRemoveCouponError(t("partners_tab.approved.remove_coupon_error"));
        } finally {
            setRemovingCouponId(null);
        }
    };

    const handleRemovePartner = async (partnerId: string) => {
        if (!window.confirm(t("partners_tab.approved.confirm_deactivate"))) return;
        setRemovingPartnerId(partnerId);
        try {
            await api.post(`/admin/partners/${partnerId}/deactivate`);
            // Remove from the list
            setPartners(prev => prev.filter(p => p.id !== partnerId));
            setDetailsDialogOpen(false);
            alert(t("partners_tab.approved.deactivate_success"));
        } catch {
            alert(t("partners_tab.approved.deactivate_error"));
        } finally {
            setRemovingPartnerId(null);
        }
    };

    if (loading) {
        return <div className="text-center py-10 text-muted-foreground">{t("partners_tab.common.loading")}</div>;
    }

    if (error) {
        return <div className="text-red-600 text-center py-10">{error}</div>;
    }

    return (
        <>
            {/* Demo Password Info */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">{t("partners_tab.approved.demo_title")}</h3>
                <div className="flex items-center gap-4">
                    <div className="font-mono text-lg bg-white px-3 py-2 rounded border border-blue-300">
                        PartnerPortal@123
                    </div>
                    <p className="text-sm text-blue-700">
                        {t("partners_tab.approved.demo_desc")}
                    </p>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t("partners_tab.common.name")}</TableHead>
                        <TableHead>{t("partners_tab.common.email")}</TableHead>
                        <TableHead>{t("partners_tab.common.number")}</TableHead>
                        <TableHead>{t("partners_tab.common.status")}</TableHead>
                        <TableHead>{t("partners_tab.common.monthly_earnings")}</TableHead>
                        <TableHead>Last month payment</TableHead>
                        <TableHead>{t("partners_tab.common.actions")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {partners.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                {t("partners_tab.approved.no_partners")}
                            </TableCell>
                        </TableRow>
                    ) : (
                        partners.map((partner) => {
                            const lastPay = partner.lastMonthPayment;
                            const isPaid = lastPay?.status === "PAID" || lastPay?.status === "CONFIRMED";
                            return (
                                <TableRow key={partner.id}>
                                    <TableCell>{partner.name}</TableCell>
                                    <TableCell>{partner.email}</TableCell>
                                    <TableCell>{partner.number}</TableCell>
                                    <TableCell>
                                        <Badge variant="default">{t("partners_tab.approved.active")}</Badge>
                                    </TableCell>
                                    <TableCell>₹{partner.monthlyEarnings?.toFixed(2) || '0.00'}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {isPaid ? (
                                                <Badge className="bg-green-600 hover:bg-green-700">Paid</Badge>
                                            ) : (
                                                <div className="flex items-center gap-1.5">
                                                    <Badge variant="secondary">Pending</Badge>
                                                    <Button
                                                        size="sm"
                                                        className="h-6 px-2 bg-green-600 hover:bg-green-700 text-white text-[10px] font-semibold flex items-center justify-center rounded"
                                                        onClick={() => openPayDialog(partner)}
                                                    >
                                                        Pay
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                asChild
                                            >
                                                <Link to={`/partners/${partner.id}`}>
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    {t("reviews.actions.view")}
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleRemovePartner(partner.id)}
                                                disabled={removingPartnerId === partner.id}
                                            >
                                                <UserMinus className="h-4 w-4 mr-1" />
                                                {removingPartnerId === partner.id ? t("partners_tab.approved.removing") : t("partners_tab.approved.remove")}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>

            {/* Details Dialog */}
            <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{t("partners_tab.approved.details_title")}</DialogTitle>
                        <DialogDescription>
                            {t("partners_tab.approved.details_desc", { name: selectedPartner?.name || t("partners_tab.common.unknown") })}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedPartner && (
                        <div className="space-y-6">
                            {(
                                <>
                                    {/* Basic Info */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="font-semibold text-sm">{t("partners_tab.common.name")}:</label>
                                            <p className="text-sm">{selectedPartner.name}</p>
                                        </div>
                                        <div>
                                            <label className="font-semibold text-sm">{t("partners_tab.common.email")}:</label>
                                            <p className="text-sm">{selectedPartner.email}</p>
                                        </div>
                                        <div>
                                            <label className="font-semibold text-sm">{t("partners_tab.common.number")}:</label>
                                            <p className="text-sm">{selectedPartner.number}</p>
                                        </div>
                                        <div>
                                            <label className="font-semibold text-sm">{t("partners_tab.approved.registered")}:</label>
                                            <p className="text-sm">{formatDate(selectedPartner.registeredAt)}</p>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    {selectedPartner.message && (
                                        <div>
                                            <label className="font-semibold text-sm">{t("partners_tab.approved.message")}:</label>
                                            <p className="text-sm bg-accent p-3 rounded mt-1">
                                                {selectedPartner.message}
                                            </p>
                                        </div>
                                    )}

                                    {/* Coupons */}
                                    <div>
                                        <h4 className="font-semibold mb-2">{t("partners_tab.approved.assigned_coupons")}:</h4>
                                        {selectedPartner.coupons?.length === 0 ? (
                                            <p className="text-muted-foreground text-sm">{t("partners_tab.approved.no_coupons")}</p>
                                        ) : (
                                            <div className="grid grid-cols-1 gap-2">
                                                {selectedPartner.coupons?.map(coupon => (
                                                    <div key={coupon.id} className="border rounded px-3 py-2 flex items-center justify-between">
                                                        <div>
                                                            <div className="font-mono text-sm bg-accent px-2 py-1 rounded mb-1 inline-block">
                                                                {coupon.code}
                                                            </div>
                                                            <p className="text-xs text-muted-foreground">
                                                                {coupon.description || t("partners_tab.approved.no_desc")}
                                                            </p>
                                                        </div>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => handleRemoveCoupon(selectedPartner.id, coupon.id)}
                                                            disabled={removingCouponId === coupon.id}
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {removeCouponError && (
                                            <Alert variant="destructive" className="mt-2">
                                                <AlertDescription>{removeCouponError}</AlertDescription>
                                            </Alert>
                                        )}
                                    </div>

                                    {/* Earnings */}
                                    <div>
                                        <h4 className="font-semibold mb-2">{t("partners_tab.approved.earnings")}:</h4>
                                        <div className="mb-3">
                                            <span className="text-lg font-bold">
                                                {t("partners_tab.approved.total")}: ₹{selectedPartner.earnings?.total?.toFixed(2) || '0.00'}
                                            </span>
                                        </div>
                                        <div>
                                            <h5 className="font-semibold text-sm mb-2">{t("partners_tab.approved.monthly")}:</h5>
                                            <div className="grid grid-cols-3 gap-2 text-sm">
                                                {selectedPartner.earnings?.monthly && Object.entries(selectedPartner.earnings.monthly).map(([month, amount]) => (
                                                    <div key={month} className="bg-accent px-2 py-1 rounded">
                                                        <div className="font-semibold">{month}</div>
                                                        <div>₹{amount.toFixed(2)}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">{t("partners_tab.common.close")}</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Quick Pay Dialog */}
            <Dialog open={payDialogOpen} onOpenChange={setPayDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-green-700">
                            <Clock className="h-5 w-5" />
                            <span>Confirm Last Month Payment</span>
                        </DialogTitle>
                        <DialogDescription>
                            Mark payment as Paid for {payPartner?.name} for the month of {monthNames[lastMonth - 1]} {lastYear}.
                        </DialogDescription>
                    </DialogHeader>

                    {payPartner && (
                        <div className="space-y-4 py-2">
                            <div className="rounded-lg bg-gray-50 border border-gray-100 p-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Partner Name:</span>
                                    <span className="font-bold text-gray-900">{payPartner.name}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Partner Email:</span>
                                    <span className="text-gray-900">{payPartner.email}</span>
                                </div>
                                <div className="flex justify-between text-sm border-t pt-2 border-gray-200">
                                    <span className="text-gray-600 font-semibold">Payment Month:</span>
                                    <span className="font-semibold text-gray-900">{monthNames[lastMonth - 1]} {lastYear}</span>
                                </div>
                                <div className="flex justify-between text-sm border-t pt-2 border-gray-200">
                                    <span className="text-gray-600 font-bold">Amount to Pay:</span>
                                    <span className="font-bold text-gray-900">₹{payPartner.lastMonthPayment?.totalAmount?.toFixed(2) || '0.00'}</span>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Payment Reference / Notes</label>
                                <Input
                                    type="text"
                                    value={payNotes}
                                    onChange={(e) => setPayNotes(e.target.value)}
                                    placeholder="e.g. Paid via UPI, Txn #1234"
                                    className="w-full"
                                    required
                                    disabled={payLoading}
                                />
                            </div>
                        </div>
                    )}

                    <DialogFooter className="sm:justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setPayDialogOpen(false);
                                setPayPartner(null);
                            }}
                            disabled={payLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={handlePayLastMonth}
                            disabled={payLoading || !payNotes.trim()}
                        >
                            {payLoading ? "Processing..." : "Confirm Payment"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
