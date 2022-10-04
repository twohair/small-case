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
const clickHandler = (e: PointerEvent) => {
  const target = e.target as HTMLDivElement;
  if (target.classList.value !== "item") return;
  const clickContent = target.innerHTML;
  if (clickContent === "=") {
    result = eval(result).toString();
    isComputed = true;
  } else if (clickContent === "0") {
    result !== "0" &&
      ((isComputed && (isComputed = false)) || (result += clickContent));
  } else {
    !isComputed &&
      clickContent !== "0" &&
      result === "0" &&
      isNotOperator(clickContent) &&
      (result = "");
    if (!isNotOperator(clickContent) && isResultEndWidthOperator()) return;
    isComputed && (isComputed = false);
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
