import React, {useMemo, useState} from 'react';
import {View} from 'react-native';

import {
  GreenTickSvg,
  GreyTick,
  InterestedGrey,
  InterestedYellowSvg,
} from '@svg';
import {AppTabs} from '../../../components';
import {getHp, getWp} from '../../utils';
const useSectionsSelection = (initialSelectedIndex = null) => {
  const SectionTypes = useMemo(() => {
    return {
      forGuestList: [
        {
          heading: 'Going',
          CheckedIcon: <GreenTickSvg />,
          UncheckedIcon: <GreyTick />,
        },
        {
          heading: 'Interested',
          CheckedIcon: (
            <InterestedYellowSvg height={getHp(17)} width={getWp(17)} />
          ),
          UncheckedIcon: <InterestedGrey />,
        },
        {
          heading: "Can't Go",
          CheckedIcon: <GreenTickSvg />,
          UncheckedIcon: <GreyTick />,
        },
      ],
    };
  }, []);
  const [selectedTabIndex, setSelectedTabIndex] =
    useState(initialSelectedIndex);
  const RenderSelectionTabs = sectionTabsProps => {
    return (
      <AppTabs.SelectedUnselectedTabs
        {...sectionTabsProps}
        selectedTabIndex={selectedTabIndex}
        onSelect={(tab, i) => {
          if (sectionTabsProps?.onSelect) {
            sectionTabsProps?.onSelect(tab, i);
          }
          if (sectionTabsProps?.isToggleMode) {
            if (selectedTabIndex == i) {
              setSelectedTabIndex(null);
            } else {
              setSelectedTabIndex(i);
            }
          } else {
            setSelectedTabIndex(i);
          }
        }}
      />
    );
  };

  return [
    selectedTabIndex,
    RenderSelectionTabs,
    SectionTypes,
    setSelectedTabIndex,
  ];
};

export default useSectionsSelection;
