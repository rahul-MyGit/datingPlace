"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.put('/update', auth_1.protectRoute, userController_1.updateProfile);
exports.default = router;
