odoo.define("pos_custom_screen.CategoryControlButton", function (require) {
  "use strict";
  const { Gui } = require("point_of_sale.Gui");
  const PosComponent = require("point_of_sale.PosComponent");
  const ProductScreen = require("point_of_sale.ProductScreen");
  const { useListener } = require("@web/core/utils/hooks");
  const Registries = require("point_of_sale.Registries");
  class CreateSaleOrder extends PosComponent {
    setup() {
      super.setup();
      useListener("click", this.onClick);
    }

    async onClick() {
      //            for creating sale order from pos throgh a button
      console.log("onclick entered");
      const order = this.env.pos.get_order();
      var cus = order.get_partner();
      var lines = order.get_orderlines();
      if (lines.length === 0) {
        Gui.showPopup("ErrorPopup", {
          title: this.env("Please select a product"),
          body: this.env(
            "You cannot create sales order without selecting a product."
          ),
        });
        return;
      } else if (!cus) {
        Gui.showPopup("ErrorPopup", {
          title: this.env("Please select a customer"),
          body: this.env(
            "You cannot create sales order without selecting a customer."
          ),
        });
        return;
      } else {
        const { confirmed } = await this.showPopup("ConfirmPopup", {
          title: "Confirmation",
          body: "Are you sure you want to create sale order?",
        });
        if (confirmed) {
          var temp_list = [];
          for (var i = 0; i < lines.length; i++) {
            const dict = {
              quantity: lines[i].quantity,
              price: lines[i].get_display_price(),
              discount: lines[i].get_discount(),
              product: lines[i].product.id,
            };
            temp_list.push(dict);
          }
          this.env.services.rpc({
            model: "sale.order",
            method: "create_sale_order",
            args: [, temp_list, cus],
          });
        }
      }
    }
  }
  CreateSaleOrder.template = "PosSaleOrderButton";

  ProductScreen.addControlButton({
    component: CreateSaleOrder,
    condition: function () {
      return true;
    },
  });
  Registries.Component.add(CreateSaleOrder);
  return CreateSaleOrder;
});
