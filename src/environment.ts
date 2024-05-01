import { isDevMode } from "@angular/core";

export const baseUrl = isDevMode() ? '/proxy' : '';
export const assetsPath = '';