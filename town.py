# this function creates a town 
class Town:
	# pre-calculated based on US data
	avg_population = 0; # for a county
	avg_numHousehold = 1000000;
	avg_numSupermarket = 0;
	avg_numHospital = 0;
	avg_numSchool = 0;

	# constructor from a n
	def __init__(self, population):
		self.population = population;
		ratio = self.population / avg_population;
		self.numHousehold = ratio * avg_numHousehold
		self.numSupermarket = ratio * avg_numSupermarket;
		self.numHospital = ratio * avg_numHospital;
		self.numSchool = ratio * avg_numSchool;
		household_list = [];
		for i in range(0, self.numHousehold + 1):
			household = new Household();
			household_list.append(household);
		# omit other types for now
			
	
	# parameterized constructor
	def __init__(self, town_dict):
		self.numHousehold = town_dict['numHousehold'];
		self.numSupermarket = town_dict['numSupermarket'];
		self.numHospital = town_dict['numHospital'];
		self.numSchool = town_dict['numSchool'];
	
	# this function retuns total infection number in the town after 
	# a user-specified time
	def infect(time):
		num_infected = 0;
		for h in household_list:
			num_infected += h.infect(time);
		# omit other types for now
		return num_infected;
	
	def infect(time, other_param):
		# omit for now
