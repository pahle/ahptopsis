import React from "react";

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between h-screen items-center">
        <div className="tracking-wider flex flex-col gap-4">
          <p className="text-slate-500">Welcome,</p>
          <h1 className="text-5xl font-semibold leading-[60px] text-slate-900">
            Sistem Pendukung
            <br />
            Keputusan
            <br />
            Pemilihan Cushion
          </h1>
          <p className="text-slate-500">
            Selamat datang di Sistem Pendukung Keputusan
            Pemilihan
            <br />
            Cushion, temukan cushion yang kamu cari disini!
          </p>
          <div className="flex gap-8 text-slate-500 font-semibold mt-4">
            <a href="/login" className="px-4 py-2 rounded-full border border-[#4D6181]">
              Login
            </a>
            <a href="/register" className="px-4 py-2 rounded-full border border-[#4D6181]">
              Register
            </a>
          </div>
        </div>
        <div>Gambar</div>
      </div>
    </div>
  );
};

export default Home;
