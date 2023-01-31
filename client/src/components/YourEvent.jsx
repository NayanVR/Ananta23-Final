import { FaTrash } from "react-icons/fa";

function YourEvent({ data, key }) {
	let colorclass = "";
	switch (data.EventType) {
		case "Inertia":
			colorclass = "bg-blue-100 text-blue-800";
			break;
		case "Swoosh":
			colorclass = "bg-yellow-100 text-yellow-800";
			break;
		case "Atmos":
			colorclass = "bg-green-100 text-green-800";
			break;
		case "KalaKriti":
			colorclass = "bg-red-100 text-red-800";
			break;
		case "Equilibrium":
			colorclass = "bg-purple-100 text-purple-800";
			break;
		case "Upshots":
			colorclass = "bg-gray-100 text-gray-800";
			break;
		case "Zingat":
			colorclass = "bg-gray-100 text-gray-800";
			break;
		default:
			colorclass = "bg-label-light";
	}

	console.log(colorclass);

	return (
		<div className="bg-white px-4 py-5 sm:p-6">
			<div className="bg-white shadow px-4 py-3 flex justify-between items-center sm:px-6">
				<div className="justify-center">
					<label className="block text-lg font-medium text-gray-700">
						{data.EventName}
					</label>
					<label
						className={`text-xs font-medium mr-2 px-1.5 py-0.5 rounded ${colorclass}`}
					>
						{data.EventType}
					</label>
				</div>
				<button
					className="inline-flex items-center justify-center py-3 px-3 h-1/4 rounded-md bg-red-400 text-white"
				>
					<FaTrash icon="fa fa-solid fa-trash" />
				</button>
			</div>
			{/* {console.log(registeredEvents)} */}
		</div>
	);
}


export default YourEvent;
