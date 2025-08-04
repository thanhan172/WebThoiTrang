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
      sp.gia === product.gia &&
      sp.size === product.size
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

document.querySelectorAll(".tung_loai_sp").forEach((khungSP) => {
  const nutGiohang = khungSP.querySelector(
    ".tung_loai_sp_nut button:first-child"
  );

  nutGiohang.addEventListener("click", () => {
    const ten = khungSP.querySelector(".tung_loai_sp_1 p").innerText;
    const gia = khungSP.querySelector(
      ".tung_loai_sp_1 p:nth-child(2)"
    ).innerText;
    const hinh = khungSP.querySelector(".hinh_anh").getAttribute("src");
    const kichco = khungSP.querySelector(".size.active");
    console.log(kichco);
    if (kichco === null) {
      alert("Bạn chưa chọn kích thước!");
      return;
    }

    const size = kichco.innerText;

    const sanpham = {
      ten: ten,
      gia: gia,
      hinh: hinh,
      size: size,
    };

    themvaogiohang(sanpham);
  });
});
function inGioHang() {
  // Hàm in các sản phẩm ra giỏ hàng
  const list = JSON.parse(localStorage.getItem("giohang")) || [];
  const khung = document.querySelector(".InGioHang");

  if (list.length == 0) {
    khung.innerHTML = `<div class=Gio_hang_trong><img src="./images/Giohang.png" alt="Giohang" />
    <p>Hiện không có sản phẩm nào trong giỏ hàng.</p></div> `;
    console.log(khung);
    const Nutthanhtoan = document.querySelector("#nutthanhtoan");
    if (Nutthanhtoan) {
      Nutthanhtoan.style.display = "none";
    }
    return;
  }
  let ds = "<ul>";
  ds += `<div class="chu_tren_sp"><strong>Thông tin sản phẩm</strong>
    <p>Size</p>
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
        <strong>${sp.ten} </strong> <p>${sp.size} <p>${sp.gia}</p>
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

/* lọc theo giá */
function locTheoGia() {
  const filterValue = document.getElementById("filterPrice").value;
  const Danhmucs = document.querySelectorAll(".danhmucs");
  Danhmucs.forEach((danhmuc) => {
    const products = danhmuc.querySelectorAll(".cloths .product-item");
    let count = 0;
    products.forEach((product) => {
      const giaText = product.querySelector(".gia").innerText;
      const giaNumber = parseInt(giaText.replace(/[^\d]/g, ""));

      let show = true;
      if (filterValue === "duoi200" && giaNumber >= 200000) {
        show = false;
      } else if (
        filterValue === "200-300" &&
        (giaNumber < 200000 || giaNumber > 300000)
      ) {
        show = false;
      } else if (filterValue === "tren300" && giaNumber <= 300000) {
        show = false;
      }

      product.style.display = show ? "block" : "none";
      if (show) {
        count++;
      }
    });
    console.log(count);
    danhmuc.style.display = count > 0 ? "block" : "none";
  });
}

/* tim kiếm */
document.addEventListener("DOMContentLoaded", function () {
  const nutTimKiem = document.querySelector(".search_nut");
  const oNhap = document.querySelector(".search_input");

  function timKiemSanPham() {
    const tuKhoa = oNhap.value.toLowerCase().trim();
    const dsDanhmuc = document.querySelectorAll(".danhmucs");
    dsDanhmuc.forEach(function (Danhmuc) {
      const dsSanPham = Danhmuc.querySelectorAll(".product-item");
      let Cosp = false;

      dsSanPham.forEach(function (sp) {
        const tenSP = sp.querySelector("p").innerText.toLowerCase();
        if (tenSP.includes(tuKhoa)) {
          sp.style.display = "inline-block";
          Cosp = true;
        } else {
          sp.style.display = "none";
        }
      });
      if (Cosp) {
        Danhmuc.style.display = "block";
      } else Danhmuc.style.display = "none";
    });
  }

  nutTimKiem.addEventListener("click", timKiemSanPham);

  oNhap.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      timKiemSanPham();
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const size = document.querySelectorAll(".size");
  size.forEach((option) => {
    option.addEventListener("click", function () {
      size.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
    });
  });
});

const hinhanh = document.querySelector(".hinh_anh");
const hinh_anh_full = document.getElementById("full");
const daux = document.getElementById("dau_x");
const zoom = document.getElementById("Imgzoom");

hinhanh.addEventListener("click", function () {
  zoom.src = this.src;
  hinh_anh_full.style.display = "flex";
});

daux.addEventListener("click", function () {
  hinh_anh_full.style.display = "none";
});
