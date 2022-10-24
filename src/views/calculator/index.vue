<template>
  <div class="flex items-center justify-center h-screen">
    <div class="calc" @click="clickHandler($event as PointerEvent)">
      <div class="result" ref="resultDom">{{ result }}</div>
      <div v-for="(item, index) in contentArr" :key="index" class="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Decimal from "decimal.js";
const resultDom = $ref<HTMLDivElement | null>(null);
const contentArr = [1, 2, 3, "+", 4, 5, 6, "-", 7, 8, 9, "*", 0, ".", "=", "/"];
let result = $ref("0");
let isComputed = $ref(false);

const isNotOperator = (target: string) =>
  target !== "+" &&
  target !== "-" &&
  target !== "." &&
  target !== "*" &&
  target !== "/";
const isResultEndWidthOperator = () =>
  result.endsWith("+") ||
  result.endsWith("-") ||
  result.endsWith("*") ||
  result.endsWith("/") ||
  result.endsWith(".");
const isStartWidthOperator = (target: string) =>
  target.startsWith("+") ||
  target.startsWith("-") ||
  target.startsWith("*") ||
  target.startsWith("/");

const calculate = (formula: string) => {
  const reg = /(?=[+|\-|*|/])/g;
  const formulaArr = formula.split(reg);
  const result = formulaArr.reduce((p, c) => {
    if (!isStartWidthOperator(c)) {
      return p.plus(c);
    }
    switch (c[0]) {
      case "+":
      case "-":
        return p.plus(c);
      case "*":
        return p.mul(c.slice(1, c.length));
      case "/":
        return p.div(c.slice(1, c.length));
      default:
        throw "error";
    }
  }, new Decimal("0"));
  return result.toString();
};
const clickHandler = (e: PointerEvent) => {
  const target = e.target as HTMLDivElement;
  if (target.classList.value !== "item") return;
  const clickContent = target.innerHTML;
  if (clickContent === "=") {
    result = calculate(result);
    isComputed = true;
  } else if (clickContent === "0") {
    result !== "0" &&
      ((isComputed && (isComputed = false)) || (result += clickContent));
  } else if (clickContent === ".") {
    const tempArr = result.split(/(?=[+|\-|*|/])/g);
    if (tempArr[tempArr.length - 1].indexOf(".") !== -1) return;
    result += clickContent;
  } else {
    !isComputed &&
      clickContent !== "0" &&
      result === "0" &&
      isNotOperator(clickContent) &&
      (result = "");
    if (!isNotOperator(clickContent) && isResultEndWidthOperator()) {
      console.log(clickContent);
      result.match(/.$/)![0] !== "." &&
        clickContent !== "." &&
        (result = result.replace(/.$/, clickContent));
      return;
    }

    if (isComputed && result === "0") {
      isComputed = false;
      result = clickContent;
      return;
    }
    result += clickContent;
  }
};
</script>

<style scoped>
.calc {
  display: grid;
  width: 500px;
  /*
   repeat(4, [col-start] 1fr) [col-end]
   = [col-start] 1fr [col-start] 1fr [col-start] 1fr [col-start] 1fr [col-end]
   */
  grid-template-columns: repeat(4, [col-start] 1fr) [col-end];
  grid-auto-rows: minmax(125px, auto);
}
.calc > .result {
  /* 从第一条线到最后(占满一行), 共享线名用名词加计数区分 */
  grid-column: col-start 1 / col-end;
  cursor: auto;
  padding: 20px;
  font-size: 4em;
  display: block;
  text-align: right;
  overflow-x: scroll;
}
.calc > .result::-webkit-scrollbar {
  display: none;
}

.calc > div {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  user-select: none;
  cursor: pointer;
  font-size: 2.5em;
}
.calc > .item:active {
  background-color: #f9f9f9;
}
</style>
