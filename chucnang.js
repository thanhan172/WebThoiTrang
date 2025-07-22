document.querySelector(".gio_hang").addEventListener("click", function () {
  // chuyển sang trang giỏ hàng
  window.location.href = "gio_hang.html";
});

function themvaogiohang(product) {
  //hàm lưu sản phẩm vào localstorage để bỏ vào giỏ hàng
  let giohang = JSON.parse(localStorage.getItem("giohang")) || [];
  const index = giohang.findIndex(
    (sp) =>
      sp.ten === product.ten &&
      sp.hinh === product.hinh &&
      sp.gia === product.gia
  );
  if (index !== -1) {
    if (!giohang[index].soluong) {
      giohang[index].soluong = 1;
    }
    giohang[index].soluong += 1;
  } else {
    product.soluong = 1;
    giohang.push(product);
  }
  console.log(product);
  localStorage.setItem("giohang", JSON.stringify(giohang));
  console.table(giohang);
  capnhatsoluong();
  const thongbao = document.querySelector(".thong_bao");
  thongbao.classList.add("hien");
  setTimeout(() => {
    thongbao.classList.remove("hien");
  }, 1500);
}

function capnhatsoluong() {
  //Hàm cập nhật số lượng sản phẩm
  const giohang = JSON.parse(localStorage.getItem("giohang")) || [];
  const soluong = document.querySelector(".gio_hang_sl");
  soluong.innerText = giohang.length;
}

document.querySelectorAll(".buttons button:last-child").forEach((nut) => {
  // Hàm gắn vào nút thêm vào giỏ hàng
  nut.addEventListener("click", () => {
    const sp = nut.closest(".cloths > div");
    const ten = sp.querySelector("p").innerText;
    const gia = sp.querySelector(".gia").innerText;
    const hinh = sp.querySelector("img").getAttribute("src");

    const sanpham = {
      ten: ten,
      gia: gia,
      hinh: hinh,
    };
    themvaogiohang(sanpham);
  });
});

function inGioHang() {
  // Hàm in các sản phẩm ra giỏ hàng
  const list = JSON.parse(localStorage.getItem("giohang")) || [];
  const khung = document.querySelector(".InGioHang");

  if (list.length == 0) {
    khung.innerHTML = `<div class=Gio_hang_trong><img src="images/Screenshot 2025-07-21 161313.png" alt="">
    <p>Hiện không có sản phẩm nào trong giỏ hàng.</p></div> `;
    const Nutthanhtoan = document.querySelector("#nutthanhtoan");
    if (Nutthanhtoan) {
      Nutthanhtoan.style.display = "none";
    }
    return;
  }
  let ds = "<ul>";
  ds += `<div class="chu_tren_sp"><strong>Thông tin sản phẩm</strong>
    <p>Giá</p>
    <p>Số lượng</p>
    </div>`;
  let tongtien = 0;
  list.forEach((sp, index) => {
    let gia = parseInt(sp.gia.replace(/[^\d]/g, ""));
    tongtien += sp.soluong * gia;

    ds += `
      <li>
        <img src="${sp.hinh}" />
        <strong>${sp.ten} </strong> <p>${sp.gia}</p>
        <span>${sp.soluong}</span>
        <button onclick="XoaSanPham(${index})">Xóa</button>      
      </li>
    `;
  });
  ds += "</ul>";
  ds += `<div style="margin-top:20px; margin-left:1000px; font-size:18px;">
      <strong>Tổng sản phẩm:</strong> ${list.length} <br/>
      <strong>Tổng tiền:</strong> ${tongtien.toLocaleString()}đ
    </div>`;
  khung.innerHTML = ds;
}

function XoaSanPham(index) {
  let giohang = JSON.parse(localStorage.getItem("giohang"));
  giohang.splice(index, 1);
  localStorage.setItem("giohang", JSON.stringify(giohang));
  capnhatsoluong();
  inGioHang();
}
document.addEventListener("DOMContentLoaded", capnhatsoluong); // Cập nhật số lượng mỗi khi load lại trang
document.addEventListener("DOMContentLoaded", inGioHang); // Để hiện giỏ hàng
