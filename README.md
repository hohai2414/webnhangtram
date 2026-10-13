# Trầm Việt — website giới thiệu và danh mục trầm hương

Website tiếng Việt dùng Node.js cho backend Gemini, không cần cài thêm thư viện. Giao diện hiện áp dụng guideline mới UEH Core HR trong C:\Users\Dell\Downloads\DESIGN.md: Inter, xanh navy, cam, thẻ trắng, sidebar desktop và thẻ xếp dọc trên mobile. Giữ tên Trầm Việt và nội dung bán trầm hương; ảnh tiếp tục lấy từ mẫu trầm ban đầu. CSS độc lập, không phụ thuộc Tailwind CDN.

## Chạy website

Cần Node.js. Mở terminal trong thư mục `C:\Users\Dell\Downloads\web tương tác`, chạy:

```powershell
npm start
```

Mở http://127.0.0.1:4173 trong trình duyệt. Giữ terminal chạy; nhấn Ctrl+C để dừng. Không cần `npm install`. Nếu cổng 4173 đang dùng, dừng phiên cũ hoặc chỉnh số cổng trong `server.cjs`.

Để kiểm tra cú pháp: `npm run check`.

Có thể đưa toàn bộ nội dung `dist` lên máy chủ static. Điều hướng dùng hash (`#/san-pham`, `#/san-pham/vong-108`, `#/gio-hang`), không cần cấu hình rewrite.

## Chỉnh nội dung

- `dist/data.js`: `SITE.brand` là tên thương hiệu; `SITE.story` là câu chuyện; `SITE.phone`, `SITE.email`, `SITE.address` là thông tin liên hệ. Điện thoại/email có giá trị sẽ tự xuất hiện thành liên kết gọi và gửi email. Mặc định để trống nhằm tránh tạo thông tin giả.
- `dist/data.js`: `PRODUCTS` chứa `id`, `name`, `category`, `price` (số nguyên VND), `spec`, `description`, `image`. Giữ `id` duy nhất; `category` phải trùng một ID trong `CATEGORIES`. Bốn sản phẩm đầu được hiển thị nổi bật.
- `dist/data.js`: `CATEGORIES` chứa tên và ảnh của bốn danh mục.
- `dist/assets`: ảnh JPG được tải trực tiếp từ URL trong HTML mẫu. `image: 'bracelet'` tương ứng `assets/bracelet.jpg`. Thay ảnh bằng ảnh sản phẩm thật trước khi kinh doanh, đặc biệt `wood.jpg` đang là ảnh không gian minh họa, chưa phải trầm nguyên liệu. Ảnh tham chiếu có thể còn tên thương hiệu/bao bì của mẫu.
- `dist/index.html`: tiêu đề ban đầu, mô tả SEO, tagline header và nội dung footer.
- `dist/app.js`: các đoạn giới thiệu trang chủ, tiêu đề, hướng dẫn sử dụng và thông báo. Tên thương hiệu trên giao diện chính lấy từ `SITE.brand`; kiểm tra lại nội dung SEO khi đổi thương hiệu.
- `dist/style.css`: biến màu ở `:root`, font và các breakpoint 767/1199 px. Giao diện hiện dùng Inter, navy và cam theo guideline mới.

## Chức năng và giới hạn

Danh sách có tìm kiếm không phân biệt dấu, lọc danh mục và sắp xếp giá. Trang chi tiết có số lượng 1–99. Giỏ hỗ trợ thêm, xóa, tăng/giảm hoặc nhập số lượng, tính tổng và lưu bằng localStorage với khóa `tram-viet-cart`. Nếu trình duyệt chặn lưu, giỏ chỉ giữ trong phiên và hiển thị thông báo. Giỏ không phải đơn hàng; chưa có thanh toán.

Form kiểm tra họ tên, số điện thoại Việt Nam, email nếu nhập, nội dung và xác nhận trạng thái demo. Sau kiểm tra hợp lệ, thông báo ghi rõ CHƯA ĐƯỢC GỬI. Không gọi API, không lưu dữ liệu tư vấn, không tạo yêu cầu hoặc thông báo gửi thành công. Muốn nhận tư vấn thật cần bổ sung endpoint/backend trong `validateForm` và chỉ báo đã gửi khi máy chủ xác nhận thành công.

Sản phẩm, giá và lịch sử thương hiệu đều là mẫu. Chưa xác nhận thành phần, xuất xứ, chính sách bán hàng, vận chuyển hoặc bảo hành. Không thêm chứng nhận, đánh giá khách hàng hay công dụng chữa bệnh. Trước khi sử dụng thật, cập nhật nội dung, hình ảnh và chính sách theo thông tin đã xác minh.

Google Fonts cần internet; khi offline sẽ dùng serif/sans-serif dự phòng. Ảnh được lưu tại máy, không phụ thuộc URL ảnh bên ngoài.

## Kiểm tra

`test.cjs` sử dụng Playwright có sẵn trong runtime Codex và Chrome cài trên máy này; script này dành cho môi trường QA hiện tại. Chạy `node test.cjs` khi server đang hoạt động. Trên máy khác cần đổi đường dẫn Playwright/Chrome trong script.

Ảnh chụp QA nằm trong `qa/`: desktop 1440, tablet 820, mobile 390 và 320 px; ảnh giỏ/form mobile. Kiểm tra gồm menu, các trang, tìm kiếm, lọc, sắp xếp, thêm/xóa/số lượng giỏ, tải lại giữ giỏ, form sai/hợp lệ nhưng chưa gửi, ảnh tải được và không tràn ngang.

## Khung tư vấn Gemini

Website hiện có trợ lý AI cố định ở góc dưới bên phải, đồng bộ phong cách thiết kế. Câu hỏi được gửi qua `POST /api/chat` đến Gemini; khách có thể hỏi về danh mục, quy cách, giá mẫu và bảo quản. Hội thoại chỉ giữ trong bộ nhớ của trang, không lưu localStorage; nội dung câu hỏi được gửi đến Google, như ghi rõ trong khung chat. Form liên hệ vẫn là form minh họa chưa gửi.

- Khóa thật nằm ở `.env` ngoài `dist`; `.gitignore` loại trừ file này. Không đưa `.env` lên hosting static hay Git. Không chép API key vào `dist/chat.js`.
- `.env.example` là cấu hình mẫu không chứa khóa thật. Khi chuyển sang máy chủ khác, cấu hình biến môi trường `GEMINI_API_KEY` và `GEMINI_MODEL` từ hệ thống secrets của hosting.
- Model đã kiểm tra: `gemini-3.1-flash-lite`. Đổi qua `GEMINI_MODEL` nếu cần; khởi động lại server sau thay đổi.
- `server.cjs`: backend đọc danh mục từ `dist/data.js`, xây dựng hướng dẫn tư vấn và gọi API. Không xác nhận mua hàng, không bịa chứng nhận hay tác dụng chữa bệnh, luôn phân biệt dữ liệu mẫu. Có giới hạn độ dài, 12 yêu cầu/phút/IP, timeout và báo lỗi thật. Giới hạn hiện tại dùng bộ nhớ từng tiến trình; khi chạy nhiều máy chủ hoặc qua reverse proxy cần cấu hình giới hạn tại gateway/hosting.
- `dist/chat.js`: giao diện chat, trạng thái đang trả lời, báo lỗi, lịch sử, cuộc trò chuyện mới. Nội dung trả lời được hiển thị bằng textContent để không thực thi HTML.
- Website có AI cần chạy backend Node.js (`npm start`), không thể chỉ đưa `dist` lên hosting static rồi dùng chat. Hosting phải hỗ trợ Node.js hoặc chuyển endpoint `/api/chat` sang serverless phù hợp. `HOST` mặc định 127.0.0.1; cấu hình `HOST=0.0.0.0` và `PORT` theo yêu cầu hosting, cùng HTTPS/reverse proxy.
- Gemini có thể trả lời sai; kiểm tra câu trả lời với dữ liệu thật trước khi sử dụng bán hàng. Tích hợp này không tạo yêu cầu tư vấn hoặc đơn hàng.
- `node test-chat.cjs` kiểm tra UI chat bằng phản hồi mock, trạng thái lỗi, reset, responsive, dữ liệu nhập và việc chặn truy cập file bí mật. Kết nối Gemini thật được kiểm tra riêng.

Tài liệu API: https://ai.google.dev/api và hướng dẫn giữ khóa ở backend: https://ai.google.dev/gemini-api/docs/api-key .

## Cập nhật brand guideline mới

Giao diện hiện tại áp dụng file `C:\Users\Dell\Downloads\DESIGN.md` (UEH Core HR) làm nguồn thiết kế mới: Inter 14/20 cho nội dung, tiêu đề 32/40 desktop và 24/32 mobile, xanh navy #005F69, cam #F26F33, nền #F5F5F5, thẻ trắng viền #E0E0E0, nút/input bo 4px, thẻ bo 8px. Giữ nội dung và tên thương hiệu Trầm Việt; không gán website cho UEH hoặc chuyển sang dữ liệu nhân sự.

Desktop từ 1280px dùng sidebar 260px, lề 24px/gutter 16px; tablet thu gọn menu, mobile dùng lề 16px và thẻ xếp dọc. `dist/brand-ui.js` chứa SVG icon nét mảnh. Các thành phần sản phẩm, form, giỏ hàng, Gemini cùng theo màu và font mới. Quy tắc mới nằm trong phần “Brand revision” cuối `dist/style.css`; phần này thay thế các chỉ dẫn màu/font cũ trong README.

