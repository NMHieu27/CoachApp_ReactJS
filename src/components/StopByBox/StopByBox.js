import { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './StopByBox.scss';
function StopByBox({
    pointList,
    selectedPoint,
    setSelectedPoint,
    selectedPointId,
    setSelectedPointId,
    stopByList,
    setStopByList,
}) {
    const [time, setTime] = useState('00:00');
    // const [stopByList, setStopByList] = useState([]);
    const handleAddStopBy = () => {
        setStopByList((prev) => [...prev, { stopById: selectedPointId, name: selectedPoint, time: `${time}:00` }]);
    };
    const handleDeleteStopBy = (index) => {
        let arrCopy = [...stopByList];
        arrCopy.splice(index, 1);
        setStopByList(arrCopy);
    };
    const handleChangeTime = (index, value) => {
        let arrCopy = [...stopByList];
        arrCopy[index] = { ...arrCopy[index], time: `${value}:00` };
        setStopByList(arrCopy);
    };
    return (
        <div className="stop-by__container">
            <div className="d-flex align-items-center">
                <div className="form-outline">
                    <div style={{ height: '48px' }}>
                        {pointList && (
                            <Dropdown
                                maxHeight={'200px'}
                                options={pointList}
                                selected={selectedPoint}
                                setSelected={setSelectedPoint}
                                selectedId={selectedPointId}
                                setSelectedId={setSelectedPointId}
                                isEdit
                                placeholder="Chọn loại xe"
                                top={'100%'}
                                paddingDropDown="0px 20px"
                                borderDropDown="1px solid #ccc"
                                borderRadiusDropDown="5px"
                                borderContentDropDown="1px solid #ccc"
                            />
                        )}
                    </div>
                </div>
                <div className="form-outline">
                    <input
                        type="time"
                        id="time-drop-off"
                        name="time-drop-off"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="form-control form-control-lg"
                    />
                </div>
                <i class="fa-solid fa-circle-plus" style={{ color: 'green' }} onClick={() => handleAddStopBy()}></i>
            </div>
            <div className="stop-by__list-stop-by">
                <div className="stop-by__list-stop-by__items-box">
                    {stopByList &&
                        stopByList.map((item, index) => (
                            <div
                                key={index}
                                className="stop-by__list-stop-by__items-box__item d-flex align-items-center "
                            >
                                <div className="form-outline">
                                    <input className="form-control form-control-lg" value={item.name} readOnly />
                                </div>
                                <div className="form-outline">
                                    <input
                                        className="form-control form-control-lg"
                                        type="time"
                                        value={item.time}
                                        onChange={(e) => handleChangeTime(index, e.target.value)}
                                    />
                                </div>
                                <i
                                    class="fa-sharp fa-solid fa-circle-xmark"
                                    style={{ color: 'red' }}
                                    onClick={() => handleDeleteStopBy(index)}
                                ></i>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
export default StopByBox;
