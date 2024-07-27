import React, { useEffect, useState } from "react";
import "./JoinPage.css";
import { useSelector } from "react-redux";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

const JoinPage = () => {
  const { uid, displayName, accessToken } =
    useSelector((state) => state.auth.userInfo) || {};
  const param = useParams();
  const [enableMeeting, setEnableMeeting] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const meetingValidation = async () => {
      if (param.id) {
        await axios
          .get(
            process.env.REACT_APP_API_BASE_URL +
              "/get-single-meeting" +
              param.id,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            const { status, message } = res.data;
            if (status === "success") {
              if (message) {
                const { date } = message;
                const meetingDate = moment(date).format("YYYY-MM-DD");
                if (meetingDate == moment().format("YYYY-MM-DD")) {
                  setEnableMeeting(true);
                } else if (
                  moment(meetingDate).isBefore(moment().format("YYYY-MM-DD"))
                ) {
                  toast.info("This meeting has already ended.", {
                    position: "top-right",
                  });
                  navigate("/");
                } else if (
                  moment(meetingDate).isAfter(moment().format("YYYY-MM-DD"))
                ) {
                  toast.info("This meeting is starting on ." + meetingDate, {
                    position: "top-right",
                  });
                  navigate("/");
                }
              }
              return setEnableMeeting(true);
            }
            toast.error(res.data.message, {
              position: "top-right",
            });
          })
          .catch((err) => {
            console.log(err);
            // setEnableMeeting(false);
          });
      }
    };
    if (accessToken) {
      meetingValidation();
    }
  }, [accessToken]);
  let myMeeting = async (element) => {
    // generate Kit Token
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      parseInt(process.env.REACT_APP_ZEGOCLOUD_APP_ID),
      process.env.REACT_APP_ZEGOCLOUD_SERVER_SECRET,
      param.id,
      uid ? uid : "",
      displayName ? displayName : ""
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    if (zp) {
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: "Personal link",
            url: window.location.origin + "/join/" + param.id,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });
    }
  };
  return uid ? (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  ) : (
    ""
  );
};

export default JoinPage;
