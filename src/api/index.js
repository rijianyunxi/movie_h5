import axios from "@/util/http"


export const getClass = ()=> axios.post("/app/classificationList",{page:0,size:999});

export const getClassMovies4 = (classificationSymbol)=> axios.post("/app/plateList",{classificationSymbol});

export const getClassMore = (classificationSymbol,page)=> axios.post("/app/plateListV2",{classificationSymbol,page,size:20});

export const top10 = ()=> axios.post("/app/hotSearchList");

export const searchVideo = (keyWord,page)=> axios.post("/app/videoSearch",{keyWord,page,size:20});

export const videoInPlateList = (plate,page)=> axios.post("/app/videoInPlateList",{plate,page,size:20});

