package root.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import root.demo.model.EnterDataForSciWork;
import root.demo.model.User;

public interface EnterDataRepository extends JpaRepository<EnterDataForSciWork, Long> {
}
