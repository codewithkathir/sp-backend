"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const analyticsService_1 = require("../services/analyticsService");
class AnalyticsController {
    static async summary(_req, res) {
        const data = await analyticsService_1.AnalyticsService.summary();
        res.json(data);
    }
}
exports.AnalyticsController = AnalyticsController;
