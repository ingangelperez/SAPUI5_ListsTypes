// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("aapg.Lists.controller.ListTypes", {
            onInit: function () {

                //Add JSON Model to the view
                var oJSONModel = new sap.ui.model.json.JSONModel();
                oJSONModel.loadData("./localService/mockdata/ListData.json");
                this.getView().setModel(oJSONModel);

            },

            getGroupHeader: function (oGroup) {

                var oGroupHeaderListItem = new sap.m.GroupHeaderListItem({
                    title: oGroup.key,
                    upperCase: true
                });

                return oGroupHeaderListItem;

            },

            onShowSelectedRow: function () {

                var oStandardList = this.getView().byId("standardList");
                var oSelectedItems = oStandardList.getSelectedItems();

                var i18nModel = this.getView().getModel("i18n").getResourceBundle();

                if (oSelectedItems.length === 0) {
                    //No items selected
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"));
                } else {
                    //Items selected

                    var sMsgText = i18nModel.getText("selection");

                    for (var item in oSelectedItems) {

                        var oContext = oSelectedItems[item].getBindingContext();
                        var oObjectContext = oContext.getObject();

                        sMsgText = sMsgText + " - " + oObjectContext.Material;

                    }

                    sap.m.MessageToast.show(sMsgText);

                }

            },

            onDeleteSelectedRow: function () {

                var oStandardList = this.getView().byId("standardList");
                var oSelectedItems = oStandardList.getSelectedItems();

                var i18nModel = this.getView().getModel("i18n").getResourceBundle();

                if (oSelectedItems.length === 0) {
                    //No items selected for delete
                    sap.m.MessageToast.show(i18nModel.getText("noSelectionForDelete"));
                } else {
                    //Items selected

                    var sMsgText = i18nModel.getText("deleted");
                    var oModel = this.getView().getModel();
                    var oProducts = oModel.getProperty("/Products");
                    var aArrayId = [];

                    for (var item in oSelectedItems) {

                        var oContext = oSelectedItems[item].getBindingContext();
                        var oObjectContext = oContext.getObject();

                        aArrayId.push(oObjectContext.Id);
                        sMsgText = sMsgText + " - " + oObjectContext.Material;

                    }

                    oProducts = oProducts.filter(function (p) {
                        return !aArrayId.includes(p.Id);
                    });

                    oModel.setProperty("/Products", oProducts);
                    oStandardList.removeSelections();
                    sap.m.MessageToast.show(sMsgText);

                }

            },

            onDeleteRow: function (oEvent) {
                //Delete row in Input List

                var oSelectedRow = oEvent.getParameter("listItem");
                var oContext = oSelectedRow.getBindingContext();
                var oObjectContext = oContext.getObject();
                var aSplitPath = oContext.getPath().split("/");
                var iRowIndex = aSplitPath[aSplitPath.length - 1];
                var oModel = this.getView().getModel();

                var oProducts = oModel.getProperty("/Products");
                oProducts.splice(iRowIndex, 1);
                oModel.refresh();

                //Show deleted item
                var i18nModel = this.getView().getModel("i18n").getResourceBundle();
                sap.m.MessageToast.show(i18nModel.getText("deleted") + " " + oObjectContext.Brand);

                

            }

        });
    });
