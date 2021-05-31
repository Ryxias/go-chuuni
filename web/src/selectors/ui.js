
import {
  createSelector,
} from 'reselect'

import {
  BRIGHTNESS_DARK,
  CHART_COLORS_LIGHT,
  CHART_COLORS_DARK,
} from 'constants/ui'

export const getUiState = state => state.ui

export const getModalName = createSelector(
  [
    getUiState,
  ],
  uiState => uiState.modalName
)

export const getModalOptions = createSelector(
  [
    getUiState,
  ],
  uiState => uiState.modalOptions
)

export const getIsModalOpen = createSelector(
  [
    getUiState,
  ],
  uiState => uiState.modalOpen
)

export const getIsDrawerOpen = createSelector(
  [
    getUiState,
  ],
  uiState => uiState.drawerOpen
)

export const getNotifications = createSelector(
  [
    getUiState,
  ], uiState => uiState.notifications,
)

export const getParams = createSelector(
  [
    getUiState,
  ], uiState => uiState.params,
)

export const getBrightness = createSelector(
  [
    getUiState,
  ], uiState => uiState.brightness,
)

export const getChartColors = createSelector(
  [
    getBrightness,
  ], (
    brightness,
  ) => brightness === BRIGHTNESS_DARK ? CHART_COLORS_DARK : CHART_COLORS_LIGHT,
)
