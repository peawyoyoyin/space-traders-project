import { LayerGroup, MapContainer, useMap, useMapEvents } from "react-leaflet"
import { useSystemsQuery } from "./query/useSystemsQuery"
import { FC, PropsWithChildren, useMemo, useState } from "react";
import { Canvas, CRS } from "leaflet";
import { minBy } from "./utils/minBy";
import { maxBy } from "./utils/maxBy";
import { SystemMarker } from "./SystemMarker";


interface SomeLayerGroupProps {
  minZoomLevel?: number
  maxZoomLevel?: number
}

export const SomeLayerGroup: FC<PropsWithChildren<SomeLayerGroupProps>> = ({ minZoomLevel, maxZoomLevel, children }) => {
  const map = useMap();
  const [zoomLevel, setZoomLevel] = useState(map.getZoom())
  
  useMapEvents({
    zoomend: () => {
      const newZoomLevel = map.getZoom()
      setZoomLevel(newZoomLevel)
    }
  })

  const shouldShow = useMemo(() => {
    return (!minZoomLevel || zoomLevel >= minZoomLevel) && (!maxZoomLevel || zoomLevel <= maxZoomLevel) 
  }, [zoomLevel, minZoomLevel, maxZoomLevel])

  return shouldShow ? (
    <LayerGroup>
      {children}
    </LayerGroup>
  ) : null
}

export const GalaxyMap = () => {
  const { data, isLoading } = useSystemsQuery();

  const bounds = useMemo(() => {
    if (!data) {
      return undefined;
    }

    const minY = minBy(data, el => el.y / 100) - 3000;
    const maxY = maxBy(data, el => el.y / 100) + 3000;
    const minX = minBy(data, el => el.x / 100) - 3000;
    const maxX = maxBy(data, el => el.x / 100) + 3000;

    return [[minY, minX, undefined], [maxY, maxX, undefined]] as [number, number, undefined][];
  }, [data])

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div style={{ height: '1000px', position: 'relative' }}>
      <MapContainer
        renderer={new Canvas()}
        crs={CRS.Simple}
        center={[0, 0]}
        attributionControl={false}
        zoomControl={true}
        scrollWheelZoom={false}
        bounds={bounds!}
        maxBounds={bounds!}
        style={{ height: '100%', top: '0', bottom: '0', left: '0', right: '0', position: 'absolute' }}
        zoom={0}
      >
        <SomeLayerGroup>
          {
            data!.map(system => (
              <SystemMarker
                key={system.symbol}
                system={system}
              />
            ))
          }
        </SomeLayerGroup>
      </MapContainer>
    </div>
  )
}