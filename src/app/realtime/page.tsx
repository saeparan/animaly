"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";
import CachedIcon from "@mui/icons-material/Cached";
import Box from "@mui/material/Box";
import Clock from "react-live-clock";
import { Card, CardContent, CardMedia, Chip, Divider } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";
import days from "dayjs";
import "dayjs/locale/ko"; // 한국어 불로 오기
import relativeTime from "dayjs/plugin/relativeTime.js";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import dayjs from "dayjs";

register("ko", koLocale);

export default function Realtime() {
  const { isPending, error, data } = useQuery({
    queryKey: ["data"],
    refetchInterval: 60000 + Math.random() * 60000,
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}/animal/realtime`).then((res) =>
        res.json()
      ),
  });

  return (
    <Box>
      <Box
        sx={{
          height: "100vh",
          backgroundImage: "url('grass-dog.jpg')",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            color: "white",
            textShadow: "1px 3px 1px rgba(0,0,0,0.33)",
            py: 1,
          }}
        >
          {isPending && (
            <Typography variant="h6" component="h1">
              <CachedIcon fontSize="small" />
              데이터 새로고침 중
            </Typography>
          )}
          {/* <Typography variant="h1" component="h1">
            <Clock format="HH:mm:ss" interval={1000} ticking={true} />
          </Typography> */}
        </Box>

        <Box m={3}>
          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            speed={1500}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {data &&
              data.map((row: any, index: any) => (
                <>
                  <SwiperSlide>
                    <Card sx={{ maxWidth: 665 }}>
                      <CardMedia
                        component="img"
                        src={row?.popfile}
                        sx={{ height: 450 }}
                      ></CardMedia>
                      <CardContent
                        sx={{ minHeight: 380, position: "relative" }}
                      >
                        <Typography
                          gutterBottom
                          variant="h2"
                          component="div"
                          sx={{
                            fontWeight: 600,
                            textOverflow: "ellipsis",
                            mb: 1,
                          }}
                          noWrap
                        >
                          {row.kindCd.split("]")[1].replaceAll("[", "")}
                        </Typography>

                        <Typography
                          gutterBottom
                          variant="h4"
                          sx={{
                            fontWeight: 500,
                            textOverflow: "ellipsis",
                            mb: 1,
                          }}
                        >
                          {row.noticeNo}
                        </Typography>

                        <Typography
                          gutterBottom
                          variant="h4"
                          component="div"
                          sx={{ fontWeight: 600, textOverflow: "ellipsis" }}
                        >
                          {row.sexCd == "F" ? "♀️" : "♂️"}&nbsp;
                          {row.sexCd == "F" ? "여아" : "남아"}&nbsp; 🍼
                          {2025 - Number(row.age.split("(")[0]) + "살"}&nbsp;
                          {dayjs(row.noticeEdt).diff(dayjs(), "days") !== -1 &&
                            "❗" +
                              dayjs(row.noticeEdt).diff(dayjs(), "days") +
                              "일 후 보호종료"}
                        </Typography>

                        <Divider sx={{ my: 1 }} />

                        <Typography
                          variant="h4"
                          color="text.secondary"
                          sx={{ minHeight: 150 }}
                        >
                          {row.specialMark}
                        </Typography>

                        <Divider sx={{ my: 1 }} />
                        <Typography
                          variant="h3"
                          color="text.primary"
                          sx={{ fontWeight: 600 }}
                        >
                          {row.careNm}
                        </Typography>

                        <Typography variant="h4">{row.careTel}</Typography>

                        <Divider sx={{ my: 1 }} />

                        <Typography variant="h5">
                          {format(row?.date, "ko")} 등록
                        </Typography>

                        {/* <Typography variant="h6" color="text.secondary">
                          {row?.happenDtFormatted} 보호소 입소
                        </Typography> */}
                      </CardContent>
                    </Card>
                  </SwiperSlide>
                </>
              ))}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
}
