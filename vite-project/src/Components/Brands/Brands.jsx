import './Brands.css';

import { brandsData } from '../../Data/Data';

export default function Brands() {
	return (
		<div className="Brands">
			<div className="container brands-container">
				{brandsData.map(({ img }, index) => {
					return (
						<div className="brand" key={index}>
							<img src={img} alt="" />
						</div>
					);
				})}
			</div>
		</div>
	);
}
