exec SP_selectedYear
exec SP_selectedWS
exec SP_selectedSemester @id_ws = 2
exec SP_selectedFaculty @id_user = 3930
exec SP_selectedFeduc @id_user = 3930, @id_faculty = 62
exec SP_selectedDirection
                    @id_year = 22,
					@id_semester = 1,
					@id_faculty = 62,
					@id_f_educ = 3

exec [dbo].[SP_selectedSpecial]
					@id_year = 22,
					@id_semester = 1,
					@id_faculty = 62,
					@id_f_educ = 3,
					@id_direction = 805


exec SP_selectedVisitGroup
					@id_year = 22,
					@id_semester = 1,
					@id_faculty = 62,
					@id_speciality = 1278


exec SP_selectedVidZanyatii
					@id_year = 22,
					@id_semester = 1,
					@id_group = 7173

exec SP_visit_student_group
					@id_year = 22,
					@id_ws = 2,
					@id_semester =1,
					@id_faculty =62,
					@id_f_educ =3,
					@id_group =7173,
					@id_vid_zaniatiy =2