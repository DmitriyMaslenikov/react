import React from 'react';
import USA from '@svg-maps/usa';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css';
import { Regions } from '../regions';
import '../styleSVG.css';

function USAMap() {
  const [selectedLocations, setSelectedLocations] = React.useState(new Set());

  const getLocationClassName = React.useCallback(
    (location) => {
      const region = Regions[location.id];
      const selectedLoc = selectedLocations;
      let locationClassName = '';
      if (selectedLoc.has(region)) {
        locationClassName = 'svg-map__location__selected';
      } else {
        switch (region) {
          case 'WEST':
            locationClassName = 'svg-map__location__WEST';
            break;
          case 'SOUTH':
            locationClassName = 'svg-map__location__SOUTH';
            break;
          case 'NORTHEAST':
            locationClassName = 'svg-map__location__NORTHEAST';
            break;
          case 'MIDWEST':
            locationClassName = 'svg-map__location__MIDWEST';
            break;
        }
      }
      return `svg-map__location ${locationClassName}`;
    },
    [selectedLocations]
  );

  const locationClick = (event) => {
    const location = event.target.attributes.id.value;
    const region = Regions[location];
    let selectedLoc = new Set(selectedLocations);

    if (selectedLoc.has(region)) {
      selectedLoc.delete(region);
    } else {
      selectedLoc.add(region);
    }

    setSelectedLocations(selectedLoc);
  };
  return (
    <>
      <SVGMap
        map={USA}
        onLocationClick={locationClick}
        locationClassName={getLocationClassName}
      />
    </>
  );
}

export default USAMap;
