
user1 = User.find_by(email: 'test@test.pl')
unless user1
  user1 = User.create!(email: 'test@test.pl', password: 'test123')
end

user2 = User.find_by(email: 'test2@test.pl')
unless user2
  user2 = User.create(email: 'test2@test.pl', password: 'test123')
end

Certificate.create(name: 'Certificate 1', description: 'Description for Certificate 1', user: user1)
Certificate.create(name: 'Certificate 2', description: 'Description for Certificate 2', user: user2)
Certificate.create(name: 'Certificate 3', description: 'Description for Certificate 3', user: user1)
Certificate.create(name: 'Certificate 4', description: 'Description for Certificate 4', user: user2)
