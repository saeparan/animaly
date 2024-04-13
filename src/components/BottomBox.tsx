import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "@mui/material/Link";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";

function BottomBox(props: any) {
  const handleClose = () => {
    props.setShelterData(null);
  };

  return (
    <Box
      position={"absolute"}
      bottom={0}
      left={0}
      width={"100%"}
      padding={2}
      borderRadius={2}
      zIndex={99999}
      bgcolor={"#ffffff"}
      boxShadow={3}
      display={props.shelter === null ? "none" : "block"}
    >
      <Paper elevation={0}>
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h6" fontWeight={500}>
          {props?.shelter?.careNm}
        </Typography>
        <Typography variant="subtitle2">
          {props?.shelter?.careAddr}
          <Link
            ml={1}
            color="rgb(2,199,90)"
            target="_blank"
            href={`https://map.naver.com/p/search/${props?.shelter?.careAddr}`}
          >
            길찾기
          </Link>
        </Typography>
        <Typography variant="subtitle2">
          <Link href={`tel: ${props?.shelter?.careTel}`}>
            {props?.shelter?.careTel}
          </Link>
        </Typography>
        <Typography variant="subtitle2" color={"text.secondary"}>
          평일 오전 {props?.shelter?.weekOprStime?.split(":")[0] ?? "?"}시 부터{" "}
          {props?.shelter?.weekOprEtime?.split(":")[0] ?? "?"}시 까지 운영
        </Typography>
        {props?.shelter?.weekendOprEtime && (
          <Typography variant="subtitle2" color={"text.secondary"}>
            토요일 오전 {props?.shelter?.weekendOprStime?.split(":")[0] ?? "?"}
            시 부터 {props?.shelter?.weekendOprEtime?.split(":")[0] ?? "?"}시
            까지 운영
          </Typography>
        )}
        <Typography variant="subtitle2" fontWeight={500} color={"error.main"}>
          부재중일 수 있으니 반드시 연락 후 방문해주세요.
        </Typography>
      </Paper>
    </Box>
  );
}

export default BottomBox;
