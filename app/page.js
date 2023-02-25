'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FcApproval } from 'react-icons/fc'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsDownload, BsExclamationTriangle } from 'react-icons/bs'
import axios from 'axios'

export default function page() {
  const [limit, setLimit] = useState(false)
  const [notPdf, setNotPdf] = useState(false)

  useEffect(() => {
    const value = localStorage.getItem('uploadCount')
    if (value === null) {
      localStorage.setItem('uploadCount', 0)
    }
  }, [])
  const onDrop = useCallback((acceptedFiles) => {
    const extension = acceptedFiles[0].path.split('.').pop()

    const value = localStorage.getItem('uploadCount')
    if (extension === 'pdf') {
      if (value < 5) {
        const result = axios
          .post('https://dummyjson.com/products/add', acceptedFiles)
          .then(function (response) {
            console.log('response', response)

            const newValue = Number(value) + 1
            localStorage.setItem('uploadCount', newValue)
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        setLimit(true)
      }
    } else {
      console.log('pdf deği')
      setNotPdf(true)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <>
      {notPdf && (
        <div className="flex justify-center items-center absolute w-full h-full bg-[#00000063] z-50">
          <div className="bg-white z-60 rounded-xl relative">
            <AiFillCloseCircle
              className="absolute right-3 top-3 text-3xl cursor-pointer hover:scale-95"
              onClick={() => setNotPdf(false)}
            />
            <div className="flex justify-center items-center flex-col p-32">
              <BsExclamationTriangle className="text-6xl text-red-500" />
              <div className="text-lg font-medium">
                Yüklediğiniz dosya formatı PDF değil !!!
              </div>
            </div>
          </div>
        </div>
      )}
      {limit && (
        <div className="flex justify-center items-center absolute w-full h-full bg-[#00000063] z-50">
          <div className="bg-white z-60 rounded-xl relative">
            <AiFillCloseCircle
              className="absolute right-3 top-3 text-3xl cursor-pointer hover:scale-95"
              onClick={() => setLimit(false)}
            />
            <div className="flex justify-center items-center flex-col p-32">
              <BsExclamationTriangle className="text-6xl text-red-500" />
              <div className="text-lg font-medium">
                Günlük dosya yükleme limitini aştınız!!!
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center p-5">
        <div className="container mt-14 px-[150px] max-md:px-0">
          <div className="w-full flex justify-center items-center flex-col">
            <div className="max-md:text-center flex justify-center flex-col items-center w-[45rem] max-md:w-auto">
              <p className="text-5xl font-medium max-md:text-4xl">
                PDF'leri kolaylaştırıyoruz.
              </p>

              <p className="text-lg font-normal leading-8  py-5  max-md:text-center  max-md:text-base text-center text-[#505256]">
                PDF boyutlarını çevrimiçi olarak kolayca küçültün. İster serbest
                çalışan ister işletme sahibi olarak, işlerinizi daha iyi, hızlı
                ve akıllıca yürütmek için araçlarımızdan faydalanabilirsiniz.
              </p>
            </div>
          </div>

          <div className="mt-10 text-black flex-1 font-extralight  h-96 bg-white shadow-2xl shadow-slate-700 rounded-2xl  opacity-80 items-center text-center text-3xl cursor-pointer">
            <div
              className="flex justify-center items-center flex-col w-full h-full p-5  "
              {...getRootProps()}
            >
              <div className="hover:scale-[0.98] transition delay-100 duration-300 ease-in-out rounded-lg border-4 border-dashed border-gray-600 w-full h-full">
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="flex w-full h-full justify-center items-center flex-col">
                    <BsDownload className="" />
                  </p>
                ) : (
                  <div className="flex w-full h-full justify-center items-center flex-col">
                    <p>
                      <BsDownload className="text-[4rem]" />
                    </p>
                    <p>
                      Dosyanızı buraya sürükleyin veya{' '}
                      <b className="underline decoration-1">tıklayın.</b>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
