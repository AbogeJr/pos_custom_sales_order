from odoo import models


class SaleOrder(models.Model):
    """Inheriting sale order for creating a sale order through POS"""

    _inherit = "sale.order"

    def create_sale_order(self, temp_list, cus):
        """To create sale order through POS"""
        self.create(
            {
                "partner_id": cus.get("id"),
                "order_line": [
                    (
                        0,
                        0,
                        {
                            "product_id": rec.get("product"),
                            "discount": rec.get("discount"),
                            "product_uom_qty": rec.get("quantity"),
                            "price_subtotal": rec.get("price"),
                        },
                    )
                    for rec in temp_list
                ],
            }
        )
