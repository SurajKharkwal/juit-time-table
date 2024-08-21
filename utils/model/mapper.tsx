// lib/models/index.ts
import { Model } from "mongoose";
import { BtechSem1, BtechSem3, BtechSem5, BtechSem7 } from "./model";

// Define a type for the model map

type batchType = Model<any, {}, {}, {}, any, any>;

type ModelMap = {
  "BTECH 1 SEM": batchType;
  "BTECH 3 SEM": batchType;
  "BTECH 5 SEM": batchType;
  "BTECH 7 SEM": batchType;
};

// Create the model map
const modelMap: ModelMap = {
  "BTECH 1 SEM": BtechSem1,
  "BTECH 3 SEM": BtechSem3,
  "BTECH 5 SEM": BtechSem5,
  "BTECH 7 SEM": BtechSem7,
};
type ModelMapKeysType = keyof typeof modelMap;

export const BatchesArray = Object.keys(modelMap);

export { modelMap, type ModelMapKeysType };
