import { NextResponse } from 'next/server';
// import fetchGeminiAnswer from '@libs/ImageToText';
// import Tesseract from "tesseract.js";

export const runtime = "nodejs";  // ✅ force Node runtime

export async function POST(req: Request) {
  

  const {ques, key} = await req.json()

  //  const { data } = await Tesseract.recognize("https://tesseract.projectnaptha.com/img/eng_bw.png", "eng", {
  //   logger: (m) => console.log(m),
  // });

  // console.log(data.text)

  // const result = await fetchGeminiAnswer(ques, key);
  // console.log(result)

  try {

    return NextResponse.json({
      success: true,
      message: "Success", error: null,
      result: [
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1]
      ]
    }, {status: 200})

  }catch (err) {
    return NextResponse.json({
      success: false,
      message: "Failed", error: err instanceof Error ? err.message : "Unknow Error"
    }, {status: 500})
  }

}

