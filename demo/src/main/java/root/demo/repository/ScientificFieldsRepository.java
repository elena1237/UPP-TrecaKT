package root.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import root.demo.model.ScientificField;

public interface ScientificFieldsRepository extends JpaRepository<ScientificField, Long> {
}
