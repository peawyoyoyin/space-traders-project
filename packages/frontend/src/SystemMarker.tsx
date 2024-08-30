import { FC, useMemo } from "react";
import { System } from "./query/useSystemsQuery";
import { Circle } from "react-leaflet";

interface SystemMarkerProps {
  system: System
}

export const SystemMarker: FC<SystemMarkerProps> = ({ system }) => {
  const radius = useMemo(() => {
    switch(system.type) {
        case "BLACK_HOLE":
          return 1;
        case "BLUE_STAR":
          return 0.85;
        case "HYPERGIANT":
          return 0.3;
        case "NEUTRON_STAR":
          return 0.5;
        case "ORANGE_STAR":
          return 0.4;
        case "RED_STAR":
          return 0.4;
        case "WHITE_DWARF":
          return 0.2;
        case "YOUNG_STAR":
          return 0.35;
        case "UNSTABLE":
        default:
          return 1;
    }
  }, [system.type])

  const fillColor = useMemo(() => {
    switch(system.type) {
        case "BLACK_HOLE":
          return "black";
        case "BLUE_STAR":
          return "#00ffff";
        case "HYPERGIANT":
          return "white";
        case "NEUTRON_STAR":
          return "yellow";
        case "ORANGE_STAR":
          return "orange";
        case "RED_STAR":
          return "red";
        case "WHITE_DWARF":
          return "white";
        case "YOUNG_STAR":
          return "#ccc";
        case "UNSTABLE":
        default:
          return "gray";
    }
  }, [system.type]);

  return (
      <Circle
        className={`system-marker_${system.type}`}
        weight={0}
        center={[system.y / 100, system.x / 100]}
        radius={radius}
        fillOpacity={0.8}
        fillColor={fillColor}
        color={fillColor}
      />
  )
}