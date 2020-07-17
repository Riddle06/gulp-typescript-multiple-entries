var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const host = 'http://api.gastom.com.tw:48080/';
class Post {
    sendRequest(url, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(host + url, {
                    method: 'POST',
                    body: JSON.stringify(content),
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const body = yield response.json();
                return body;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
export const post = new Post();
// export default post;
