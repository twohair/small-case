import type { RouteRecordRaw, RouteLocationNormalized } from "vue-router";

type RouteMeta = {
  meta?: {
    hoverColor?: string;
    showName?: string;
  };
};

export type Route = RouteMeta & RouteRecordRaw;

export type RouteNormalized = RouteMeta & RouteLocationNormalized;
