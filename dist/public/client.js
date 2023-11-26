"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const responseContainer = document.getElementById('responseContainer');
    if (loadingIndicator && responseContainer) {
        try {
            const response = yield fetch('http://localhost:3000/api/v1');
            const data = yield response.json();
            loadingIndicator.style.display = 'none';
            responseContainer.innerHTML = JSON.stringify(data, null, 2);
            responseContainer.style.display = 'block';
        }
        catch (error) {
            loadingIndicator.innerHTML = 'Error loading data';
            console.error('Error:', error);
        }
    }
}));
