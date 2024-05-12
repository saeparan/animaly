"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한국어 불로 오기
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import SelectAnimalType from "@/components/SelectAnimalType";

export default function Screen2() {
  const { data } = useQuery({
    queryKey: ["data"],
    refetchInterval: 60000 + Math.random() * 60000,
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}/animal`).then((res) =>
        res.json()
      ),
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          background: "#f5f5f5",
          borderRadius: 2,
        }}
      >
        <Grid sx={{ m: 1 }} container spacing={2}>
          <Grid xs={4}>
            <SelectAnimalType />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          height: "100vh",
          p: 3,
          backgroundImage: "url('grass-dog.jpg')",
          backgroundRepeat: "no-repeat",
          background: "#f5f5f5",
        }}
      >
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          slidesOffsetAfter={20}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          speed={500}
          autoplay={{
            delay: 3800,
            disableOnInteraction: false,
          }}
          loop={false}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {data &&
            data.map((row: any, index: any) => (
              <>
                <SwiperSlide>
                  <Card sx={{ boxShadow: 0, maxWidth: 665 }}>
                    <CardMedia
                      component="img"
                      src={row?.popFile}
                      sx={{ height: 450 }}
                    ></CardMedia>
                    <CardContent sx={{ minHeight: 380, position: "relative" }}>
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
                        {row.kindCdDetail}
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
                        sx={{
                          fontWeight: 500,
                          textOverflow: "ellipsis",
                          mb: 1,
                        }}
                      >
                        {dayjs(row.noticeStartDate).format("YYYY-MM-DD")}~
                        {dayjs(row.noticeEndDate).format("YYYY-MM-DD")}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                        sx={{ fontWeight: 600, textOverflow: "ellipsis" }}
                      >
                        {row.sexCd == "F" ? "♀️" : "♂️"}&nbsp;
                        {row.sexCd == "F" ? "여아" : "남아"}&nbsp; 🍼
                        {2025 - row?.age + "살 추정"}
                      </Typography>
                      <Typography
                        variant="h4"
                        color="text.secondary"
                        sx={{ minHeight: 150 }}
                      >
                        {row.specialText}
                      </Typography>

                      <Divider sx={{ my: 2 }} />
                      <Typography
                        variant="h3"
                        color="text.primary"
                        sx={{ fontWeight: 600 }}
                      >
                        {row.careName}
                      </Typography>

                      <Typography variant="h4">{row.careTel}</Typography>

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
  );
}
