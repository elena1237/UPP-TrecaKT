package root.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import root.demo.model.Magazine;
import root.demo.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
