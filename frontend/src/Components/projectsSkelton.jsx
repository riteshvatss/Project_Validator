
import axios from "axios";

import { useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import {  Link } from "react-router-dom";
import {Rating}  from "react-simple-star-rating"


export const Projects_Card = ({ task, pathh }) => {
  const location = useLocation();
  const [loc, setLoc] = useState(false);

  useEffect(() => {
    setLoc(location.pathname === "/validatorPage");
  }, [location.pathname]);

  return (
    <Link to={`${pathh}/${task.id}/${loc}`}>
      <div className="
        group relative
        mx-auto mt-12 max-w-[420px] sm:max-w-[520px] md:max-w-[900px]
        rounded-3xl
        bg-gray-950/80 backdrop-blur-xl
        border border-purple-500/30
        shadow-[0_0_50px_rgba(168,85,247,0.15)]
        transition-all duration-500
        hover:-translate-y-4
        hover:shadow-[0_0_90px_rgba(168,85,247,0.4)]
        animate-cardFloat
      ">
        <div className="
          absolute inset-0 rounded-3xl
          bg-gradient-to-br from-purple-500/10 to-pink-500/10
          opacity-0 group-hover:opacity-100
          transition-opacity
        " />

        <div className="relative z-10 p-6 sm:p-8">
          <h2 className="
            text-2xl sm:text-3xl font-bold
            bg-gradient-to-r from-red-400 to-green-400
            bg-clip-text text-transparent
            transition-all duration-300
            group-hover:tracking-wide
          ">
            {task.title}
          </h2>
          <div className="mt-6 overflow-hidden rounded-2xl">
            <img
              src={task.image_Url}
              alt={task.title}
              className="
                w-full h-[220px] object-cover
                transition-transform duration-700
                group-hover:scale-110
              "
            />
          </div>
          <p className="
            mt-5 text-gray-300 text-sm sm:text-base
            line-clamp-4
          ">
            {task.description}
          </p>
          <div className="mt-4">
            <Rating
              initialValue={task.average_Rating}
              readonly
              fillColor="#facc15"
              emptyColor="#374151"
              size={22}
              SVGclassName="inline-block"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export const Project_Card = ({ task, isVal }) => {
  const [isValue, setIsValue] = useState(isVal);
  const SignUrl = import.meta.env.VITE_URL;
  const [comment, setComment] = useState("");
  const [value, setValue] = useState(null);
  const [updatedtask, setUpdatedtask] = useState(task);

  async function SubMitValidation() {
    axios.post(`${SignUrl}/app/v1/validator/ValidationSubmission`, {
      comment,
      rating: Number(Math.max(1,value)),
      task_Id: task.id,
      task_amount: task.amount,
    }, {
      headers: { Authorization: localStorage.getItem("token") }
    }).then(async () => {
      setIsValue(false);
      const ttask = (await axios.get(`${SignUrl}/app/v1/validator/task`, {
        params: { task_Id: task.id },
        headers: { Authorization: localStorage.getItem("token") }
      })).data;
      setUpdatedtask(ttask);
      setComment("");
      alert("Response Submitted Successfully");
    });
  }

  return (
    <div className="pt-28 pb-16 animate-page-enter">
      <div className="
        relative mx-auto max-w-5xl
        bg-gray-950/80 backdrop-blur-xl
        border border-purple-500/30
        rounded-3xl
        shadow-[0_0_80px_rgba(168,85,247,0.25)]
        p-6 sm:p-10
      ">
        <h1 className="
          text-3xl sm:text-4xl font-extrabold
          bg-gradient-to-r from-red-400 to-green-500
          bg-clip-text text-transparent
        ">
          {updatedtask.title}
        </h1>
        <div className="mt-8 overflow-hidden rounded-3xl">
          <img
            src={updatedtask.image_Url}
            className="
              w-full max-h-[420px] object-cover
              transition-transform duration-700
              hover:scale-105
            "
          />
        </div>
        <div className="flex gap-6 mt-6 text-blue-400 hover:text-blue-300">
          <a className="hover:shadow-[0_0_80px_rgba(59,130,400,0.28)]" href={updatedtask.web_Url} target="_blank">Website</a>
          <a className="hover:shadow-[0_0_80px_rgba(168,85,400,0.25)]" href={updatedtask.github_Url} target="_blank">GitHub</a>
        </div>
        <p className="mt-6 text-gray-300 whitespace-pre-wrap">
          {updatedtask.description}
        </p>
         {isValue?(
                        <div className="text-white pb-4  mb-4">
                            
                            <textarea onChange={(e)=>{
                                        setComment(e.target.value);
                                        e.target.style.height = "auto";
                                        e.target.style.height = `${e.target.scrollHeight}px`; 
                                }} value={comment} className="w-full rounded-md bg-gray-700 text-white resize-none shadow-2xl my-2 mb-4 border border-purple-500 p-3 overflow-hidden text-md" placeholder="Comment.."
                                rows={2}
                                maxLength={500}
                            />
                             <Rating
                                    initialValue={0}
                                    onClick={(e)=>setValue(e)}
                                    fillColor="#facc15"
                                    emptyColor="#374151"
                                    size={24}
                                    SVGclassName="inline-block"

                                />
                            <div className="flex justify-center">
                             <button
              onClick={SubMitValidation}
              className="
                mt-6 px-10 py-4 rounded-xl
                bg-gradient-to-r from-emerald-600 to-teal-600
                text-white font-semibold
                shadow-[0_0_40px_rgba(34,197,94,0.6)]
                hover:scale-105 transition-all
              "
            >
              Submit Validation
            </button>
                        </div>
                        </div>
                    ):( <div className="text-white mt-4 pb-6 text-base sm:text-lg md:text-xl text-left w-full block">
                        <div className="mb-3 font-semibold tracking-wide text-purple-300">Comments</div>
  <div>
    {updatedtask.submissions?.map((submission) => (
      <div
        key={submission.id}
        className="bg-gray-800/60 border border-gray-700 rounded-lg py-3 text-gray-300 text-sm sm:text-base break-words shadow-md my-3 whitespace-pre-wrap px-2"
      >
        {submission.comment || "No comment provided"}
      </div>
    ))}
  </div>
  <div className="pt-4 flex items-center gap-2">
    <span className="text-sm text-gray-400">Average Rating:</span>
    <Rating
            initialValue={updatedtask.average_Rating}
            readonly
            fillColor="#facc15"
            emptyColor="#374151"
            size={24}
            SVGclassName="inline-block"

  />
  </div>

</div>

                    )}
      </div>
    </div>
  );
};
