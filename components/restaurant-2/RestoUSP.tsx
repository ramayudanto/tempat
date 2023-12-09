import React from 'react'

export default function RestoUSP() {
  return (
      <div className=" bg-white flex flex-col justify-start items-center gap-5">
                <div className="w-full justify-between items-center flex">
                    <div className="flex-col justify-start items-start inline-flex">
                        <p className="text-slate-700 text-lg font-bold leading-normal">Serunya Makan di Sini</p>
                    </div>
                    <div className="pr-[0.81px] flex-col justify-start items-start inline-flex">
                        <p className="text-slate-500 text-xs  ">Lihat semua</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 justify-start items-start ">
                    <div className="self-stretch py-3 justify-start items-start gap-4 flex">
                        <div className="w-11 pb-2 justify flex">
                            <div className="w-11 h-11 justify-center items-center inline-flex">
                                <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
                                    <img src="https://tempatapp.sgp1.cdn.digitaloceanspaces.com/image/login.svg" alt="login prompt" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-y-2">
                            <p className="text-slate-700 text-sm font-bold">Tempat bersih, layanannya keren</p>
                            <p className=" text-slate-500 text-sm font-normal ">90% tamu menilai kebersihan dan layanan di akomodasi ini fantastis.</p>
                        </div>
                    </div>
                    <div className="self-stretch py-3 justify-start items-start gap-4 flex">
                        <div className="w-11 pb-2 justify flex">
                            <div className="w-11 h-11 justify-center items-center inline-flex">
                                <img src="https://tempatapp.sgp1.cdn.digitaloceanspaces.com/image/login.svg" alt="login prompt" />
                            </div>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-y-2">
                            <p className="text-slate-700 text-sm font-semibold">Cocok untuk perjalanan medis</p>
                            <p className=" text-slate-500 text-sm font-normal">Dekat fasilitas kesehatan dan disukai tamu yang melakukan perjalanan medis.</p>
                        </div>
                    </div>
                    <div className="self-stretch py-3 justify-start items-start gap-4 flex">
                        <div className="w-11 pb-2 justify flex">
                            <div className="w-11 h-11 justify-center items-center inline-flex">
                                <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
                                    <img src="https://tempatapp.sgp1.cdn.digitaloceanspaces.com/image/login.svg" alt="login prompt" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-y-2">
                            <p className="text-slate-700 text-sm font-semibold">Gampang Akses transportasi umum</p>
                            <p className=" text-slate-500 text-sm font-normal  ">Dekat fasilitas kesehatan dan disukai tamu yang melakukan perjalanan medis.</p>
                        </div>
                    </div>
                </div>
              </div>
  )
}
