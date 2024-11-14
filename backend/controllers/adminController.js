exports.addSalesManager = async (req, res) => {
     // logic to add a Sales Manager
};

exports.viewLocations = async (req, res) => {
     const managers = await User.find({ role: 'Sales Manager' }, 'location');
     const labours = await User.find({ role: 'Labour' }, 'location');
     res.send({ managers, labours });
};
