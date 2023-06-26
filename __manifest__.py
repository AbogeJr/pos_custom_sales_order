{
    "name": "POS Custom Sales Order",
    "version": "1.0",
    "depends": ["point_of_sale", "sale_management"],
    "assets": {
        "point_of_sale.assets": [
            "pos_custom_sales_order/static/src/xml/sale_order_button.xml",
            "pos_custom_sales_order/static/src/js/sale_order_button.js",
        ],
    },
    "installable": True,
    "application": False,
    "auto_install": False,
    "license": "LGPL-3",
}
