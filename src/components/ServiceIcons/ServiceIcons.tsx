import React from "react";
import { serviceStatusType } from "../../api/getServicesStatus";
import css from "./ServiceIcons.module.css";
import { ReactComponent as NightIcon } from "./Night.svg";
import { ReactComponent as HammerIcon } from "./Hammer.svg";
import {
  areThereAnyDisruptions,
  isNightServiceAvailable,
} from "../../utils/common";

type ServiceIcons = {
  item: serviceStatusType;
};

export const ServiceIcons: React.FC<ServiceIcons> = ({ item }) => (
  <div className={css.Root}>
    {isNightServiceAvailable(item) && <NightIcon className={css.Icon} />}
    {areThereAnyDisruptions(item) && <HammerIcon className={css.Icon} />}
  </div>
);
