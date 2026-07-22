package external

import (
	"encoding/json"
)

func (x *GetDataVersionActionResponse) AsIdeal() (*GetDataVersionActionRes, error) {
	b, err := json.Marshal(x.GetPayload())
	if err != nil {
		return nil, err
	}

	var res GetDataVersionActionRes
	if err := json.Unmarshal(b, &res); err != nil {
		return nil, err
	}

	return &res, nil
}

func (x *GetOperationsStatisticsActionResponse) AsIdeal() (*GetOperationsStatisticsActionRes, error) {
	b, err := json.Marshal(x.GetPayload())
	if err != nil {
		return nil, err
	}

	var res GetOperationsStatisticsActionRes
	if err := json.Unmarshal(b, &res); err != nil {
		return nil, err
	}

	return &res, nil
}

func (x *GetStopTypesActionResponse) AsIdeal() (*GetStopTypesActionRes, error) {
	b, err := json.Marshal(x.GetPayload())
	if err != nil {
		return nil, err
	}

	var res GetStopTypesActionRes
	if err := json.Unmarshal(b, &res); err != nil {
		return nil, err
	}

	return &res, nil
}

func (x *GetStationsActionResponse) AsIdeal() (*GetStationsActionRes, error) {
	b, err := json.Marshal(x.GetPayload())
	if err != nil {
		return nil, err
	}

	var res GetStationsActionRes
	if err := json.Unmarshal(b, &res); err != nil {
		return nil, err
	}

	return &res, nil
}

func (x *GetCarriersActionResponse) AsIdeal() (*GetCarriersActionRes, error) {
	b, err := json.Marshal(x.GetPayload())
	if err != nil {
		return nil, err
	}

	var res GetCarriersActionRes
	if err := json.Unmarshal(b, &res); err != nil {
		return nil, err
	}

	return &res, nil
}
