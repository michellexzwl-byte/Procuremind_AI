import { quotes, suppliers } from "@/mock/data";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function QuoteCompareTable() {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-left text-xs text-muted-foreground">
          <tr>
            <th className="px-4 py-3">供应商</th>
            <th className="px-4 py-3">总价</th>
            <th className="px-4 py-3">交期</th>
            <th className="px-4 py-3">付款条件</th>
            <th className="px-4 py-3">质保期</th>
            <th className="px-4 py-3">异常项</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => {
            const supplier = suppliers.find((s) => s.id === quote.supplierId);
            return (
              <tr key={quote.supplierId} className="border-t">
                <td className="px-4 py-3 font-medium">{supplier?.name}</td>
                <td className="px-4 py-3">{formatCurrency(quote.totalPrice)}</td>
                <td className="px-4 py-3">{quote.deliveryDays} 天</td>
                <td className="px-4 py-3">{quote.paymentTerms}</td>
                <td className="px-4 py-3">{quote.warrantyMonths} 个月</td>
                <td className="px-4 py-3">
                  {quote.abnormal ? <Badge variant="warning">{quote.abnormal}</Badge> : <Badge variant="success">正常</Badge>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
