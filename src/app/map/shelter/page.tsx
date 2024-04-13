"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import useKakaoLoader from "@/useKakaoLoader";
import { Map, MapMarker, ZoomControl, useMap } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BottomBox from "@/components/BottomBox";

export default function About() {
  useKakaoLoader();

  const { isPending, error, data } = useQuery({
    queryKey: ["shelterData"],
    queryFn: () =>
      fetch("http://localhost:3000/ANIMAL/shelters").then((res) => res.json()),
  });

  const [shelter, setShelterData] = useState<object | null>(null);
  const [mapLevel, setMapLevel] = useState<number>(8);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 37.566826, longitude: 126.9786567 });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
      });
    }
  }, []);

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <BottomBox shelter={shelter} setShelterData={setShelterData} />
      <Map
        id="map"
        center={{
          lat: location.latitude,
          lng: location.longitude,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        level={mapLevel}
      >
        <ZoomControl position={"RIGHT"} />
        {data &&
          data.map((row: any) => (
            <MapMarker
              key={`${row.id}`}
              position={{ lat: row.lat, lng: row.lng }}
              onClick={(marker) => {
                console.log(row);
                setShelterData(row);
              }}
              image={{
                src: "/animal-shelter.png",
                size: {
                  width: 33,
                  height: 35,
                },
              }}
            />
          ))}
      </Map>
    </Box>
  );
}
