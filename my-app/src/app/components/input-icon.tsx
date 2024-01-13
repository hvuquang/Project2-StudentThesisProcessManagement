// components/InputWithIcons.js
import { Button } from "@/components/ui/button/Button";
import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { PUTTeacherConfirmScore } from "../api/topic-api";
import { toast } from "sonner";

interface YourComponentProps {
  thesis_id: string;
  getData: () => void; // Adjust the return type as needed
}

const InputWithIcons: React.FC<YourComponentProps> = ({
  thesis_id,
  getData,
}) => {
  const [value, setValue] = useState("");
  return (
    <div className="flex gap-2 w-1/2 mx-auto">
      <input
        type="text"
        placeholder="Nhập điểm ..."
        className="p-2 border rounded"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Button
        onClick={async () => {
          await PUTTeacherConfirmScore({ thesis_id: thesis_id, score: value })
            .then((res) => {
              toast.success("Thêm điểm thành công!");
            })
            .catch((err) => {
              toast.error("Thất bại: " + err);
            });
          await getData();
        }}
        variant={"default"}
      >
        Enter
      </Button>
    </div>
  );
};

export default InputWithIcons;
