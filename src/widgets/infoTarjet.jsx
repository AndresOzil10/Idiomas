import { useState } from "react";

const url = "http://localhost/API/idiomas/functions.php";

const enviarData = async (url, data) => {
  const resp = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const json = await resp.json();
  return json;
}

const InfoTarjet = () => { 
    const [ceco, setCeco] = useState([]);

    const fetchData = async () => {
        const DeletedUsers = {
              "aksi": "ChargeCeCo",
            }
        const respuesta = await enviarData(url, DeletedUsers)
    }
    return <>
        <div className="flex w-full flex-col">
            <div className="stats stats-vertical lg:stats-horizontal shadow">
                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">$31K</div>
                    <div className="stat-desc">309495</div>
                </div>

                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">4,200</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">$25K</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">$27K</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">$25K</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">$25K</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">$25K</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">$25K</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">$25K</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">$25K</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">$25K</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
                <div className="divider"></div>
                <div className="stats stats-vertical lg:stats-horizontal shadow">
                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">31K</div>
                    <div className="stat-desc">309495</div>
                </div>

                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">4,200</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">$25K</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">$25K</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">$25K</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">$25K</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">$25K</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">$25K</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">$25K</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat">
                    <div className="stat-title">CeCo</div>
                    <div className="stat-value">$25K</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
        </div>
    </>
 }

 export default InfoTarjet