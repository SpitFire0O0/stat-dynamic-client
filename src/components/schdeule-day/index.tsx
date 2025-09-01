import React from "react";
import module from "./schedule-day.module.css";

export const ScheduleDay: React.FC = () => {
	const a = [0,0,0,0,0,0,0,0]
	return (
		<div className={module.Container}>
			<div className={module.Date}>
				<div className={module.DayName}>Вторник</div>
				<div className={module.DayDate}>01.09.2025</div>
			</div>
			
			<div className={module.Content}>
				{
					a.map((_, i) => (
						<div className={module.Labels} key={i}>
							<div className={module.Time}>12:30 - 13:15</div>
							<div className={module.Title}>Алгебра</div>
							<div className={module.Person}>Александров А.Д.</div>
							<div className={module.Room}>123 каб.</div>
							<div className={module.Type}>Занятие</div>
							<div className={module.Description}>Описание</div>
						</div>
					))
				}
			</div>
		</div>
	)
}