import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSnapshot } from "valtio";

import TimeCardForm from "../components/forms/TimeCardForm";
import { timeCardActions, store } from "../store";
import { TimeCard } from "../types/TimeCard";

function TimeCardEdit() {
  const { id } = useParams();
  const { selectedTimeCard } = useSnapshot(store);

  useEffect(() => {
    const loadTimeCard = async () => {
      if (!selectedTimeCard && id) {
        try {
          await timeCardActions.setSelectedTimeCard(id);
        } catch (error) {
          console.error("Failed to load time card", error);
        }
      }
    };

    loadTimeCard();
  }, [id, selectedTimeCard]);

  if (!selectedTimeCard) {
    return <div>Time Card not found</div>;
  }

  return (
    <TimeCardForm
      isCreate={false}
      title="Update Time Card"
      timeCard={selectedTimeCard as TimeCard}
    />
  );
}

export default TimeCardEdit;
