/*global QUnit*/

sap.ui.define([
	"aapg/Lists/controller/ListTypes.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ListTypes Controller");

	QUnit.test("I should test the ListTypes controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
