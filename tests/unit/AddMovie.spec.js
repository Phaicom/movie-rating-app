import Vue from "vue";
import AddMovie from "@/components/AddMovie";
import { expect } from "chai";
import assert from "assert";

describe("AddMovie", () => {
  let cmp, vm;

  beforeEach(() => {
    cmp = Vue.extend(AddMovie);
    vm = new cmp({
      data: {
        years: ["2018", "2017", "2016", "2015"]
      }
    }).$mount();
  });

  it('equals years to ["2018", "2017", "2016", "2015"]', () => {
    console.log(vm.years);
    expect(vm.years).to.eql(["2018", "2017", "2016", "2015"]);
  });

  it("has a submitForm() method", () => {
    assert.deepEqual(typeof vm.submitForm, "function");
  });

  it("has a resetForm() method", () => {
    assert.deepEqual(typeof vm.resetForm, "function");
  });
});
